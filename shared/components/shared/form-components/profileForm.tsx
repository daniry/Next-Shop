"use client";

import { User } from "@prisma/client";
import { Container } from "../container";
import { Title } from "../title";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formRegisterSchema, TFormRegisterValues } from "@/shared/constants/authSchema";
import toast from "react-hot-toast";
import { FormInput } from "./formInput";
import { Button } from "../../ui/button";
import { signOut } from "next-auth/react";
import { updateUserInfo } from "@/app/actions";

interface Props {
    data: User;
}

export const ProfileForm: React.FC<Props> = ({ data }) => {
    // TODO: используется схема для регистрации, поэтому при апдейте профиля обновлять пароль нужно обязательно. Можно добавить новую схему, где пароль будет не обязателен
    const form = useForm({
        resolver: zodResolver(formRegisterSchema),
        defaultValues: {
            fullName: data.fullname,
            email: data.email,
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (data: TFormRegisterValues) => {
        try {
            await updateUserInfo({
                email: data.email,
                fullname: data.fullName,
                password: data.password,
            });

            toast.error("Данные обновлены 📝", {
                icon: "✅",
            });
        } catch (error) {
            console.error(error);
            return toast.error("Ошибка при обновлении данных", {
                icon: "❌",
            });
        }
    };

    const onClickSignOut = () => {
        signOut({
            callbackUrl: "/",
        });
    };

    return (
        <Container className="my-10">
            <Title text={`Личные данные | #${data.id} - ${data.email}`} size="md" className="font-bold" />
            <FormProvider {...form}>
                <form className="flex flex-col gap-5 w-96 mt-10" onSubmit={form.handleSubmit(onSubmit)}>
                    <FormInput name="email" label="E-Mail" required />
                    <FormInput name="fullName" label="Полное имя" required />

                    <FormInput type="password" name="password" label="Новый пароль" required />
                    <FormInput type="password" name="confirmPassword" label="Повторите пароль" required />

                    <Button disabled={form.formState.isSubmitting} className="text-base mt-10" type="submit">
                        Сохранить
                    </Button>

                    <Button onClick={onClickSignOut} variant="secondary" disabled={form.formState.isSubmitting} className="text-base" type="button">
                        Выйти
                    </Button>
                </form>
            </FormProvider>
        </Container>
    );
};
