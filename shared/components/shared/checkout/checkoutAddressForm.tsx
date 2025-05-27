import { Controller, useFormContext } from "react-hook-form";
import { AddressInput } from "../addressInput";
import { FormTextarea } from "../form-components";
import { WhiteBlock } from "../whiteBlock";
import { ErrorText } from "../errorText";

interface Props {
    className?: string;
}

export const CheckoutAddressForm: React.FC<Props> = ({ className }) => {
    const { control } = useFormContext();
    return (
        <WhiteBlock title="3. Адрес доставки" className={className}>
            <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-5">
                    <Controller
                        name="address"
                        control={control}
                        render={({ field, fieldState }) => (
                            <>
                                <AddressInput onChange={field.onChange} />
                                {fieldState.error?.message && <ErrorText text={fieldState.error.message} />}
                            </>
                        )}
                    />
                    <FormTextarea className="text-base" placeholder="Комментарий к заказу" rows={5} name={"comment"} />
                </div>
            </div>
        </WhiteBlock>
    );
};
