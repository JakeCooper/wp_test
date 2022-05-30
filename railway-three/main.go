package main

import (
	"github.com/gin-gonic/gin"
	"os/exec"
)

var Router * gin.Engine
func main() {
	r := gin.Default()
	r.GET("/", func(c *gin.Context) {
		version, err := exec.Command("go", "version").Output()
		if err != nil {
			c.JSON(500, gin.H{
				"error": err,
			})
			return
                }
		c.JSON(200, gin.H{
			"message": string(version),
		})
	})
	r.Run()
}
