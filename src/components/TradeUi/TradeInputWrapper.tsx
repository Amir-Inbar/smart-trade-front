import {Control, Controller} from 'react-hook-form';
import {ReactElement} from 'react';
import {InputItem} from '@/components/Scenarios/Scenarios.util';

interface TradeInputWrapperProps {
    item: InputItem;
    control: Control<any>;
    errorMessage?: string;

    render(item: any, field: any): ReactElement;
}

export const TradeInputWrapper = ({
                                      item,
                                      errorMessage,
                                      control,
                                      render: renderElement,
                                  }: TradeInputWrapperProps) => (
    <div key={item.name} className='mb-4 mr-4'>
        <label className='block text-sm font-medium mb-1' htmlFor={item.name}>
            {item.label}
        </label>
        <div className='text-xs text-gray-500 mb-2'>{item.note}</div>
        <Controller
            name={item.name}
            control={control}
            defaultValue={item.default === undefined ? '' : item.default}
            render={({field}) => renderElement(item, field)}
        />
        {errorMessage && (
            <span className='text-red-500 text-sm mt-1 block'>{errorMessage}</span>
        )}
    </div>
);
