"use client";

import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ReloadIcon } from "@radix-ui/react-icons";

import { ChangePasswordSchema } from "@/app/schemas";

interface ChangePasswordFormProps {
    handleSubmit: (formData: z.infer<typeof ChangePasswordSchema>) => void;
    submitPending: boolean;
}

export const ChangePasswordForm = ({
    handleSubmit,
    submitPending,
}: ChangePasswordFormProps) => {
    const {
        register,
        handleSubmit: rhfHandleSubmit,
        formState: { errors },
        watch,
    } = useForm<{ password: string; password2: string }>({
        defaultValues: {
            password: "",
            password2: "",
        },
    });
    
    const passwordValue = watch("password");
    return (
            <form
                onSubmit={rhfHandleSubmit(handleSubmit)}
                className="space-y-6"
                autoComplete="off"
            >
                {/* Password */}
                <FormItem>
                    <FormLabel>Password*</FormLabel>
                    <FormControl>
                        <Input
                            type="password"
                            placeholder="Enter new password"
                            autoComplete="new-password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: { value: 8, message: "Password must be at least 6 characters" },
                                maxLength: { value: 20, message: "Password must be at most 20 characters" },
                            })}
                        />
                    </FormControl>
                    {errors.password && <FormMessage>{errors.password.message}</FormMessage>}
                </FormItem>

                {/* Confirm Password */}
                <FormItem>
                    <FormLabel>Confirm Password*</FormLabel>
                    <FormControl>
                        <Input
                            type="password"
                            placeholder="Confirm new password"
                            autoComplete="new-password"
                            {...register("password2", {
                                required: "Confirm Password is required",
                                validate: (value) =>
                                    value === passwordValue || "Passwords do not match",
                            })}
                        />
                    </FormControl>
                    {errors.password2 && <FormMessage>{errors.password2.message}</FormMessage>}
                </FormItem>

                {/* Submit Button */}
                {submitPending ? (
                    <Button variant="destructive" disabled className="w-full">
                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                        Please Wait...
                    </Button>
                ) : (
                    <Button type="submit" variant="destructive" className="w-full">
                        Save Changes
                    </Button>
                )}
            </form>
    );
};
