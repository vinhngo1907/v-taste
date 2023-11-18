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
	namePointer := &name

	fmt.Println(&namePointer)
	fmt.Println(name)
	printPointer(namePointer)
	fmt.Println(name)
}

func printPointer(namePointer *string){
	(*namePointer) = "hej"
	fmt.Println(&namePointer)
}

func (p *person) updateFirstName(newFirstName string){
	(*p).firstName = newFirstName
}

func (p *person) print() {
	fmt.Printf("\n%+v\n", p)
}