import { ReactNode } from "react";
import { Resend } from "resend";

export const sendEmail = async (to: string, subject: string, template: ReactNode | Promise<ReactNode>) => {
    if (!process.env.RESEND_API_KEY) {
        return;
    }
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Разворачиваем промис, если template является Promise
    const resolvedTemplate = template instanceof Promise ? await template : template;

    const { data, error } = await resend.emails.send({
        from: "onboarding@resend.dev",
        to,
        subject,
        text: "",
        react: resolvedTemplate,
    });

    if (error) {
        throw error;
    }

    return data;
};
