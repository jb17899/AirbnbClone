'use client'
import { dateRangeProps } from "./ListingClient"
import Calendar from "./Calendar"
import { Range } from "react-date-range"
import Button from "./Button"

interface listingReservationProps {
    price: number,
    totalPrice: number,
    onChange: (value: Range) => void,
    dateRange: Range,
    onSubmit: () => void,
    disabled: boolean,
    disabledDates: Array<Date>
}


const ListingReservation: React.FC<listingReservationProps> = ({
    price,
    totalPrice,
    onChange,
    dateRange,
    onSubmit,
    disabled,
    disabledDates
}) => {
    return (
        <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
            <div className="flex flex-row items-center gap-1 p-4">
                <div className="font-semibold text-2xl">
                    $ {price}
                </div>
                <div className="font-light text-neutral-600">
                    night
                </div>
            </div>
            <hr className="text-neutral-100 bg-neutral-100" />
            <Calendar value={dateRange} disabledDates={disabledDates} onChange={(value) => { onChange(value.selection) }} />
            <hr className="text-neutral-100 bg-neutral-100" />
            <div className="p-4">
                <Button
                disabled={disabled}
                label="Reserve"
                onClick={onSubmit}
                />

            </div>
            <div className="p-4 flex flex-row item-center justify-between font-semibold text-lg">
                <div>
                    Total
                </div>
                <div>$ {totalPrice}</div>
            </div>

        </div>
    )
}

export default ListingReservation
