class Person {
	static greetExtraTerrestrials(raceName) {
		return `Welcome to Planet Earth ${raceName}`
	}

	constructor(firstName = 'John', lastName = 'Doe', age = 0, gender = 'Male') {
		this.firstName = firstName
		this.lastName = lastName
		this.age = age
		this.gender = gender
	}

	sayFullName() {
		return `${this.firstName} ${this.lastName}`
	}
}

let test = new Person()

console.log(test.sayFullName())
console.log(Person.greetExtraTerrestrials("people"))