package main

import "fmt"

type triangle struct {
	height float64
	base float64
}

type sqare struct {
	sideLength float64
}

func (t triangle) getArea() float64 {
	return 0.5 * t.height * t.base
}

func (s square) getArea() float64 {
	return s.sideLength * s.sideLength
}

type printableArea interface {
	getArea() float64
}

func printArea(p printableArea) {
	fmt.Println(p.getArea())
}

func main() {
	t := triangle{height: 10, base: 20}
	s := sqare{sideLength: 30}
	printArea(t)
	printArea(s)
}