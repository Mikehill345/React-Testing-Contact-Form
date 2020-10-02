import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import ContactForm from './components/ContactForm'
import { act } from "react-dom/test-utils";

test("renders App without crashing", () => {
  render(<App />);
});


describe('test contact form ', () => {
  test('renders app without errors', () => {
    render(<App />)
  })
  test('user can fill out form and submit', async() => {
     act(() => {
      render(<ContactForm />)
    })
    
    const firstNameInput = await screen.getByTestId(/firstName/i)
    const lastNameInput = await screen.getByTestId(/lastName/i)
    const emailInput = await screen.getByTestId(/email/i)
    const messageInput = await screen.getByTestId(/message/i) 
    const submit = await screen.getByTestId(/submit/i)

    fireEvent.change(firstNameInput, {target:{name:'firstName', value:'Michael'}})
    fireEvent.change(lastNameInput, {target:{name:'lastName', value:'Hill'}})
    fireEvent.change(emailInput, {target:{name:'email', value:'Michael@michael.com'}})
    fireEvent.change(messageInput, {target:{name:'message', value:'Look some notes'}})

    fireEvent.click(submit)

    const newFirstName = screen.findByText(/Michael/i)
    const newLastName = screen.findByText(/Hill/i)
    const newEmail = screen.findByText(/Michael@michael.com/i)
    const newMessage = screen.findByText(/Look some notes/i)
  })
})