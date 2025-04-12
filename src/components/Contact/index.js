import React, { useRef } from "react"
import styled from "styled-components"
import emailjs from "@emailjs/browser"
import { useState } from "react"

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    z-index: 1;
    align-items: center;
    @media (max-width: 960px) {
        padding: 0px;
    }
`

const Wrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    width: 100%;
    max-width: 1350px;
    padding: 0px 0px 80px 0px;
    gap: 12px;
    @media (max-width: 960px) {
        flex-direction: column;
    }
`

const Title = styled.div`
    font-size: 42px;
    text-align: center;
    font-weight: 600;
    margin-top: 20px;
    color: ${({ theme }) => theme.text_primary};
    @media (max-width: 768px) {
        margin-top: 12px;
        font-size: 32px;
    }
`

const Desc = styled.div`
    font-size: 18px;
    text-align: center;
    max-width: 600px;
    color: ${({ theme }) => theme.text_secondary};
    @media (max-width: 768px) {
        margin-top: 12px;
        font-size: 16px;
    }
`

const ContactForm = styled.form`
    width: 95%;
    max-width: 600px;
    display: flex;
    flex-direction: column;
    background-color: ${({ theme }) => theme.card};
    padding: 32px;
    border-radius: 16px;
    box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
    margin-top: 28px;
    gap: 12px;
`

const ContactTitle = styled.div`
    font-size: 24px;
    margin-bottom: 6px;
    font-weight: 600;
    color: ${({ theme }) => theme.text_primary};
`

const ContactInput = styled.input`
    flex: 1;
    background-color: transparent;
    border: 1px solid ${({ theme }) => theme.text_secondary};
    outline: none;
    font-size: 18px;
    color: ${({ theme }) => theme.text_primary};
    border-radius: 12px;
    padding: 12px 16px;
    &:focus {
        border: 1px solid ${({ theme }) => theme.primary};
    }
`

const ContactInputMessage = styled.textarea`
    flex: 1;
    background-color: transparent;
    border: 1px solid ${({ theme }) => theme.text_secondary};
    outline: none;
    font-size: 18px;
    color: ${({ theme }) => theme.text_primary};
    border-radius: 12px;
    padding: 12px 16px;
    &:focus {
        border: 1px solid ${({ theme }) => theme.primary};
    }
`

const ContactButton = styled.input`
    width: 100%;
    text-decoration: none;
    text-align: center;
    background: hsla(271, 100%, 50%, 1);
    background: linear-gradient(
        225deg,
        hsla(271, 100%, 50%, 1) 0%,
        hsla(294, 100%, 50%, 1) 100%
    );
    background: -moz-linear-gradient(
        225deg,
        hsla(271, 100%, 50%, 1) 0%,
        hsla(294, 100%, 50%, 1) 100%
    );
    background: -webkit-linear-gradient(
        225deg,
        hsla(271, 100%, 50%, 1) 0%,
        hsla(294, 100%, 50%, 1) 100%
    );
    padding: 13px 16px;
    margin-top: 2px;
    border-radius: 12px;
    border: none;
    color: ${({ theme }) => theme.text_primary};
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    &:hover {
        transform: scale(1.05);
    }
    &:disabled {
        background: ${({ theme }) => theme.text_secondary + 50};
        cursor: not-allowed;
    }
`

const Contact = ({ setOpen, setAlert }) => {
    const form = useRef()
    const [isSending, setIsSending] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        setAlert({ message: "", severity: "success" })

        // Validation
        const { from_email, from_name, subject, message } = form.current
        if (
            !from_email.value ||
            !from_name.value ||
            !subject.value ||
            !message.value
        ) {
            setAlert({ message: "Please fill all fields.", severity: "error" })
            setOpen(true)
            return
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(from_email.value)) {
            setAlert({
                message: "Please enter a valid email address.",
                severity: "error",
            })
            setOpen(true)
            return
        }

        setIsSending(true)

        const templateParams = {
            name: from_name.value,
            email: from_email.value,
            subject: subject.value,
            message: message.value,
            time: new Date().toLocaleString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                hour12: true,
            }),
        }

        emailjs
            .sendForm(
                "service_ssoeuv6",
                "template_x21216c",
                form.current,
                "rZHer8oeEHF3_B3yJ"
            )
            .then(
                () => {
                    setAlert({
                        message: "Email sent successfully!",
                        severity: "success",
                    })
                    setOpen(true)
                    form.current.reset()
                },
                (error) => {
                    setAlert({
                        message: "Failed to send email. Please try again.",
                        severity: "error",
                    })
                    setOpen(true)
                    console.log(error.text)
                }
            )
            .finally(() => {
                setIsSending(false)
            })
    }

    return (
        <Container id="contact">
            <Wrapper>
                <Title>Contact</Title>
                <Desc>
                    Feel free to reach out to me for any questions or
                    opportunities!
                </Desc>
                <ContactForm ref={form} onSubmit={handleSubmit}>
                    <ContactTitle>Email Me 🚀</ContactTitle>
                    <ContactInput
                        placeholder="Your Email"
                        name="from_email"
                        required
                    />
                    <ContactInput
                        placeholder="Your Name"
                        name="from_name"
                        required
                    />
                    <ContactInput
                        placeholder="Subject"
                        name="subject"
                        required
                    />
                    <ContactInputMessage
                        placeholder="Message"
                        rows="4"
                        name="message"
                        required
                    />
                    <ContactButton
                        type="submit"
                        value={isSending ? "Sending..." : "Send"}
                        disabled={isSending}
                    />
                </ContactForm>
            </Wrapper>
        </Container>
    )
}

export default Contact
