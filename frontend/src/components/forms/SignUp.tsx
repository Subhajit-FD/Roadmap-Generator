"use client"
import { useState } from "react"
import { EyeIcon, EyeClosedIcon } from "@phosphor-icons/react"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"

import { Field, FieldLabel, FieldError } from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "@/redux/redux-hooks"
import { registerUser } from "@/redux/features/authentication/authenticationSlice"


const formSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long").nonempty("Username is required"),
  email: z.email().nonempty("Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters long").nonempty("Password is required"),
})

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const dispatch = useAppDispatch()
  const { isLoading, error } = useAppSelector((state) => state.authentication)
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await dispatch(registerUser(values)).unwrap();
      toast.success("Registration successful! Welcome aboard.")
      form.reset();
      navigate("/");
    } catch (error) {
      toast.error("Registration failed. Please try again.",error instanceof Error ? { description: error.message } : undefined)
    }
  }

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto max-w-3xl space-y-8 py-10"
      >
        <Field>
          <FieldLabel htmlFor="username">Username</FieldLabel>
          <Input
            id="username"
            placeholder="Enter Your Username"
            {...form.register("username")}
          />

          <FieldError>{form.formState.errors.username?.message}</FieldError>
        </Field>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            placeholder="Enter Your Email"
            {...form.register("email")}
          />

          <FieldError>{form.formState.errors.email?.message}</FieldError>
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password."
              {...form.register("password")}
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute top-1/2 right-2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeIcon size={20} />
              ) : (
                <EyeClosedIcon size={20} />
              )}
            </button>
          </div>
          <FieldError>{form.formState.errors.password?.message}</FieldError>
        </Field>
        {error ? <p className="text-sm text-destructive">{error}</p> : null}
        <Button type="submit" disabled={isLoading}>{isLoading ? "Signing up..." : "Sign Up"}</Button>
      </form>
    </FormProvider>
  )
}
