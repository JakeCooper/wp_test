project = "railway-mesh"

app "railway-one" {
  labels = {
    "service" = "railway-one",
    "env"     = "dev"
  }

  build {
    use "docker" {}
    registry {
      use "docker" {
        image = "railway-one"
        tag   = "1"
        local = true
      }
    }
  }

  deploy {
    use "kubernetes" {
      probe_path = "/"
      service_port = 4001
    }
  }

  release {
    use "kubernetes" {
      // Sets up a load balancer to access released application
      load_balancer = true
      port          = 4001
    }
  }
}

app "railway-two" {
  path = "./railway-two"
  labels = {
    "service" = "railway-two",
    "env"     = "dev"
  }

  build {
    use "docker" {}
    registry {
      use "docker" {
        image = "railway-two"
        tag   = "1"
        local = true
      }
    }
  }

  deploy {
    use "kubernetes" {
      probe_path = "/"
      service_port = 4002
      replicas = 3
    }
   }

  release {
    use "kubernetes" {
      // Sets up a load balancer to access released application
      load_balancer = true
      port          = 4002
    }
  }
}

app "railway-three" {
  path = "./railway-three"
  labels = {
    "service" = "railway-three",
    "env"     = "dev"
  }

  build {
    use "pack" {}
    registry {
      use "docker" {
        image = "railway-three"
        tag   = "1"
        local = true
      }
    }
  }

  deploy {
    use "kubernetes" {
      probe_path = "/"
      service_port = 4003
      replicas = 3
    }
   }

  release {
    use "kubernetes" {
      // Sets up a load balancer to access released application
      load_balancer = true
      port          = 4003
    }
  }
}

