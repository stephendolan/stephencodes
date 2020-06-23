---
date: "2018-11-29"
title: "Switching Scaffolded Lucky Crystal Apps to UUIDs"
description: "By default, scaffolded Lucky apps with authentication lean on `Int64` types for user IDs, but there's often a compelling case for switching to UUIDs from the get-go."
slug: "ruby-library-folder-structure"
featured: true
tags: [crystal, lucky, luckyframework]
---

## Introducing...

I've **really** been enjoying working with [Lucky](https://github.com/luckyframework/lucky) over the last few weeks, having developed on the web using only [Rails](https://github.com/rails/rails) for as long as I can remember. The community is fantastically welcoming and helpful, the Lucky framework is artfully crafted and intuitive, and it is _fast_ without trying too hard or making things obscure.

Lucky has a [CLI](https://github.com/luckyframework/lucky_cli) that can be used to generate apps using a very simple `lucky init` command. If you generate an app with authentication built-in, you get a `User` model with an ID column that's defaulted to an `Int64`. Here's a (hopefully future-proof) set of steps to convert over to UUIDs in a scaffolded app!

## Add the `pgcrypto` extension to Postgres

The first action to take is straightforward, but requires a few steps.

We need to add the `pgcrypto` extension to our database _before_ the user model is created. To do that, we'll rename that migration and insert a new one before it:

`mv 00000000000001_create_users.cr 00000000000001_create_users.cr`

I also went ahead and manually created the migration for adding the extension:

`touch 00000000000001_enable_pgcrypto.cr`

Add this content to that file to create the extension in your database and remove it on rollback:

```cr
class EnablePgcrypto::V00000000000001 < Avram::Migrator::Migration::V1
  def migrate
    execute "CREATE EXTENSION IF NOT EXISTS pgcrypto"
  end

  def rollback
    execute "DROP EXTENSION pgcrypto"
  end
end
```

## Tell Lucky to expect UUIDs by default for all model IDs

You can enable this on only specific modules, but if you're planning on using UUIDs for all of your application's records, go ahead and add this to `src/models/base_model.cr`:

```cr
macro default_columns
  primary_key id : UUID
  timestamps
end
```

You can read more about your options for this step in the [Lucky Guides](https://luckyframework.org/guides/database/models#setting-the-primary-key).

## Change some types!

Crystal is a [typed language](https://en.wikipedia.org/wiki/Type_system), so we need to tell the compiler that everywhere it previously expected a 64-bit integer for a `User`'s ID, it now needs to expect a `UUID`. We also need to change the code supplying that `User` ID to supply a `UUID` instead of an integer.

Rather than running through file-by-file, which may become out of date as the Lucky CLI and framework evolve, here are the two things to search for that you'll need to replace in your generated application:

### `Int64`

The only occurrences of this type in your app should be for typing `User.id`, and the switch to UUIDs is as simple as replacing `Int64` with `UUID`. I'll provide my changes from the `PasswordResets::NewPage` as an example.

Before:

```cr
class PasswordResets::NewPage < AuthLayout
  needs operation : ResetPassword
  needs user_id : Int64

  ...
end
```

After:

```cr
class PasswordResets::NewPage < AuthLayout
  needs operation : ResetPassword
  needs user_id : UUID

  ...
end
```

### `to_i64`

This is the last change we need to make. We've covered converting type expectations in the previous section, and now we'll convert the code that provides the `User` ID.

The change to make to callers of `to_i64` is to strip off `to_i64`, and pass everything else to [`UUID.new`](<https://crystal-lang.org/api/0.35.1/UUID.html#new(value:String,variant=nil,version=nil)-class-method>). I'll provide two examples below.

#### From the `PasswordResets::Create` action

Before:

```cr
html NewPage, operation: operation, user_id: user_id.to_i64`
```

After:

```cr
html NewPage, operation: operation, user_id: UUID.new(user_id)
```

#### From the `UserToken` model:

Before:

```cr
payload["user_id"].to_s.to_i64
```

After:

```cr
UUID.new(payload["user_id"].to_s)
```

## Summary

To convert a generated Lucky app to use UUIDs, we completed these actions:

1. Add the `pgcrypto` extension to Postgres
1. Tell Lucky to use UUIDs by default for model IDs
1. Rename type delcarations from `Int64` -> `UUID`
1. Refactor callers to pass `UUID.new` values instead of `String#to_i64` values

For further reading, head over to the [Lucky Guides](https://luckyframework.org/) and search `UUID` in the search bar at the top of the page!
