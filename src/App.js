import React, { useState } from "react"
import styled from "styled-components"
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik"
import * as yup from "yup"

const initialValues = {
  name: "",
  email: "",
  channel: "",
  comments: "",
  phoneNo: ["", ""],
  social: {
    facebook: "",
    twitter: "",
  },
}

const savedData = {
  name: "Thomas",
  email: "Thomas@gmail.com",
  channel: "tomtom",
  comments: "welcome",
  phoneNo: ["0123456789", "7894561230"],
  social: {
    facebook: "@tomtom",
    twitter: "@tomtom",
  },
}

const onSubmit = (values, onSubmitProps) => {
  console.log(values)
  onSubmitProps.setSubmitting(false)
  onSubmitProps.resetForm()
}
// const validate = values => {
//   const error = {}
//   if (!values.name) error.name = "Required!"
//   if (values.email) {
//     if (
//       !values.email.match(
//         /^[A-z][A-z0-9]{3,}@[a-z]{3,}\.[a-z]{3}(\.[a-z]{2})?$/
//       )
//     )
//       error.email = "invalid email"
//     else {
//       error.email = null
//     }
//   } else error.email = "required!"
//   if (!values.channel) error.channel = "required!"
//   return error
// }

const validationSchema = yup.object().shape({
  name: yup
    .string("not a string")
    .required("required")
    .min(3, "3 characters minimum")
    .max(15, "15characters max"),
  email: yup.string().email("not an email").required("required"),
  channel: yup
    .string("not a string")
    .required("required")
    .min(3, "3 characters minimum")
    .max(15, "15characters max"),
  comments: yup
    .string("not a string")
    .required("required")
    .min(3, "3 characters minimum")
    .max(15, "15 characters max"),
  social: yup.object().shape({
    facebook: yup
      .string("not a string")
      .required("required")
      .min(3, "3 characters minimum")
      .max(15, "15 characters max"),
    twitter: yup
      .string("not a string")
      .required("required")
      .min(3, "3 characters minimum")
      .max(15, "15 characters max"),
  }),
  phoneNo: yup.array(
    yup
      .string("not a string")
      .required("required")
      .min(10, "must be 10 digits")
      .max(10, "must be 10 digits")
  ),
})
function App() {
  // const formik = useFormik({
  //   initialValues,
  //   onSubmit,
  //   // validate,
  //   validationSchema,
  // })
  const [formData, setFormData] = useState(null)
  return (
    <>
      <Formik
        initialValues={formData || initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {formik => {
          return (
            <FormContainer>
              <Form>
                <FormGroup>
                  <Label htmlFor="name">Name</Label>
                  <Field as={Input} id="name" name="name" />
                  <ErrorMessage component={Error} name="name" />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="email">Email</Label>
                  <Field as={Input} id="email" name="email" />
                  <ErrorMessage component={Error} name="email" />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="channel">Channel</Label>
                  <Field as="textarea" id="channel" name="channel" />
                  <ErrorMessage component={Error} name="channel" />
                </FormGroup>
                <FormGroup>
                  <Label htmlfor="comments">Comments </Label>
                  <Field
                    id="comments"
                    name="comments"
                    // validate={comments => {
                    //   if (comments.includes("fuck"))
                    //     return "no explicit words allowed"
                    //   return undefined
                    // }}
                  >
                    {props => (
                      <>
                        {console.log(props.field)}
                        <Input {...props.field} />
                        <Error>{props.meta.touched && props.meta.error}</Error>
                      </>
                    )}
                  </Field>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="twitter">Twitter</Label>
                  <Field as={Input} id="twitter" name="social.twitter" />
                  <ErrorMessage component={Error} name="social.twitter" />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="facebook">Facebook</Label>
                  <Field as={Input} id="facebook" name="social.facebook" />
                  <ErrorMessage component={Error} name="social.facebook" />
                </FormGroup>
                {/* <FormGroup>
              <Label htmlFor="phoneNo1">Phone Number 1</Label>
              <Field as={Input} id="phoneNo1" name="phoneNo[0]" />
              <ErrorMessage component={Error} name="phoneNo[0]" />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="phoneNo2">Phone Number 2</Label>
              <Field as={Input} id="phoneNo2" name="phoneNo[1]" />
              <ErrorMessage component={Error} name="phoneNo[1]" />
            </FormGroup> */}
                <FormGroup>
                  <FieldArray name="phoneNo">
                    {({
                      remove,
                      push,
                      form: {
                        values: { phoneNo },
                      },
                    }) =>
                      phoneNo.map((PhNumber, index) => (
                        <div key={index}>
                          <Label htmlFor={`phoneNo${index}`}>
                            Phone Number {index}
                          </Label>
                          <Field
                            name={`phoneNo[${index}]`}
                            id={`phoneNo${index}`}
                            as={Input}
                          />
                          <FieldButton
                            disabled={phoneNo.length === 1}
                            type="button"
                            onClick={() => {
                              remove(index)
                            }}
                          >
                            -
                          </FieldButton>
                          <FieldButton
                            type="button"
                            onClick={() => {
                              push("")
                            }}
                          >
                            +
                          </FieldButton>
                          <ErrorMessage
                            name={`phoneNo[${index}]`}
                            component={Error}
                          />
                        </div>
                      ))
                    }
                  </FieldArray>
                </FormGroup>
                <Button
                  type="button"
                  onClick={() => formik.validateField("channel")}
                >
                  validate Channel
                </Button>
                <Button type="button" onClick={() => formik.validateForm()}>
                  validate All
                </Button>
                <Button
                  type="button"
                  onClick={() => formik.setFieldTouched("channel")}
                >
                  visit Channel
                </Button>
                <Button
                  type="button"
                  onClick={() =>
                    formik.setTouched({
                      name: true,
                      email: true,
                      channel: true,
                      comments: true,
                      phoneNo: [true, true],
                      social: {
                        facebook: true,
                        twitter: true,
                      },
                    })
                  }
                >
                  visit All
                </Button>
                <FormGroup>
                  <Button
                    disabled={
                      !(formik.isValid && formik.dirty) || formik.isSubmitting
                    }
                    type="submit"
                    onClick={() => {
                      console.log("on Submit")
                      setFormData(initialValues)
                    }}
                  >
                    Submit
                  </Button>
                  <Button
                    type="button"
                    onClick={() => {
                      setFormData(savedData)
                    }}
                  >
                    load data
                  </Button>
                  <Button
                    onClick={() => setFormData(initialValues)}
                    type="button"
                  >
                    reset
                  </Button>
                </FormGroup>
              </Form>
            </FormContainer>
          )
        }}
      </Formik>
    </>
  )
}

const Error = styled.span`
  color: red;
  text-transform: capitalize;
`

const FormContainer = styled.div`
  background-color: #f0f0f0;
  width: 80%;
  margin: 5rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Input = styled.input`
  height: 2rem;
  width: 20rem;
  border-radius: 3px;
  display: block;
`

const Label = styled.label`
  text-align: left;
`
const FormGroup = styled.div`
  margin-bottom: 1rem;
`
const Button = styled.button``
const FieldButton = styled.button``

export default App
