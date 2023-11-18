package main

import {
	"fmt"
}

type contactInfo struct {
	email string
	zipCode int
}

type person struct {
	firstName string
	lastName string
	contactInfo
}

func main(){
	name := "bill"
}