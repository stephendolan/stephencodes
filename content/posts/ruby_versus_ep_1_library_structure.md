---
date: "2018-11-29"
title: "Ruby Versus | Episode 1 | Library Folder Structure"
description: "How do you structure your libraries in Ruby? In this first installment of Ruby Versus, I'll present two options I've used with the pros and cons of each."
slug: "ruby-library-folder-structure"
tags: [ruby]
---

## Background

I began my journey with Ruby while using the Ruby on Rails web framework. As such, it allowed me to skip some of the very powerful object oriented features that the language provides in favor of getting applications deployed very quickly.

With a renewed focus on utilizing effective design patterns and small classes to solve the issues I come across, there has also been a huge increase in the number of files in my project folders.

Time for the first installation of Ruby Versus, where I propose two methods of accomplishing the same objective, iterate through their pros and cons, and request that you, the reader, do the same in the comments below this post.

## What We're Modeling

We want to track different types of vehicles in our application. There will certainly be some behavior shared by all vehicles, but there will also be specific behavior for the different types of vehicles, like a truck or a car.

For example, all vehicles will need to know about the wheel_count and passenger_capacity. Trucks need to know their tow_capacity, and cars need to know their trunk_capacity.

## Option 1 - Top-Level Class Files

The first folder structure would look a little something like this:

```shell
vehicle_app
├── vehicle
│   ├── car.rb
│   └── truck.rb
└── vehicle.rb
```

And the files within it would take this shape:

##### vehicle_app/vehicle.rb

```ruby
class Vehicle
  attr_accessor :wheel_count, :passenger_capacity
end
```

##### vehicle_app/vehicle/car.rb

```ruby
class Vehicle
  class Car < Vehicle
    attr_accessor :trunk_capacity
  end
end
```

##### vehicle_app/vehicle/truck.rb

```ruby
class Vehicle
  class Truck < Vehicle
    attr_accessor :tow_capacity
  end
end
```

### Pros

The conventions for initializing a Vehicle or one of its subclasses is quite intuitive.

`Vehicle.new`, `Vehicle::Car.new`, and `Vehicle::Truck.new` feel like what we would want to write.

This method is used quite a lot to define parent classes or modules in community libraries, so you'll find an adequate amount of help online for troubleshooting and implementation details.

### Cons

Because we want to namespace an inherited class, nesting the `Truck` class within `Vehicle` and having it inherit from `Vehicle` feels a bit strange, but necessary if we want to access it through `Vehicle::Truck` instead of just `Truck`.

I find this folder structure difficult to traverse in my day-to-day work, because most prompts won't order the `vehicle` directory and `vehicle.rb` files together with an ls command.

## Option 2 - Using a Base Class

An alternative folder structure could look like this:

```
vehicle_app
└── vehicle
    ├── base.rb
    ├── car.rb
    └── truck.rb
```

And the files within it would take this shape:

##### vehicle_app/vehicle/base.rb

```ruby
module Vehicle
  class Base
    attr_accessor :wheel_count, :passenger_capacity
  end
end
```

##### vehicle_app/vehicle/car.rb

```ruby
module Vehicle
  class Car < Base
    attr_accessor :trunk_capacity
  end
end
```

##### vehicle_app/vehicle/truck.rb

```ruby
module Vehicle
  class Truck < Base
    attr_accessor :tow_capacity
  end
end
```

### Pros

The conventions for initializing a `Vehicle` or one of its subclasses are still very nice. `Vehicle::Base.new`, `Vehicle::Car.new`, and `Vehicle::Truck.new` feel like what we would want to write.

The file structure is nicely organized. If we want to see everything relating to a `Vehicle`, we can cd into that directory, and all of the relevant files are in one place.

We can define `Vehicle` as a module instead of a class, which I believe communicates more of our intention for this code and is simpler to reason about. It's very easy to tell that all of these objects / files are within the concept of a `Vehicle`.

### Cons

`require` statements outside of a system where your libraries are autoloaded, like Ruby on Rails, will need to be a touch more explicit. It might even still be necessary for a top-level `vehicle.rb` file, which simply defines the `Vehicle` module and autoloads the various related files.

While this structure functionally serves the same role, it is generally not what you will find recommended by the community and other libraries.

## My Verdict

While historically I have always used Option 1, after discussing the pros and cons with Chris Oliver at [GoRails](https://gorails.com), I'm certainly going to be giving Option 2 a go to see how well it works in my Ruby on Rails applications.
