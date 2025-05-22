import { Input, Textarea } from "../../ui";
import { WhiteBlock } from "../whiteBlock";

interface Props {
    className?: string;
}

export const CheckoutAddressForm: React.FC<Props> = ({ className }) => {
    return (
        <WhiteBlock title="3. Адрес доставки" className={className}>
            <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-5">
                    <Input name="firstName" className="text-base" placeholder="Имя" />
                    <Textarea className="text-base" placeholder="Комментарий к заказу" rows={5} />
                </div>
            </div>
        </WhiteBlock>
    );
};
