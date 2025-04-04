"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerWithRangeProps {
  className?: string
  date: DateRange | undefined
  setDate: (date: DateRange | undefined) => void
  align?: "center" | "start" | "end"
  showCompare?: boolean
}

export function DatePickerWithRange({
  className,
  date,
  setDate,
  align = "start",
  showCompare = false,
}: DatePickerWithRangeProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align={align}>
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={(newDate) => {
              setDate(newDate)
              if (newDate?.to) {
                setIsOpen(false)
              }
            }}
            numberOfMonths={2}
          />
          {showCompare && (
            <>
              <div className="border-t border-border px-3 py-2 text-center text-sm">
                <Button
                  variant="ghost"
                  className="text-xs"
                  onClick={() => {
                    const today = new Date()
                    const oneMonthAgo = new Date()
                    oneMonthAgo.setMonth(today.getMonth() - 1)
                    setDate({
                      from: oneMonthAgo,
                      to: today,
                    })
                    setIsOpen(false)
                  }}
                >
                  Last 30 days
                </Button>
                <Button
                  variant="ghost"
                  className="text-xs"
                  onClick={() => {
                    const today = new Date()
                    const threeMonthsAgo = new Date()
                    threeMonthsAgo.setMonth(today.getMonth() - 3)
                    setDate({
                      from: threeMonthsAgo,
                      to: today,
                    })
                    setIsOpen(false)
                  }}
                >
                  Last 90 days
                </Button>
                <Button
                  variant="ghost"
                  className="text-xs"
                  onClick={() => {
                    const today = new Date()
                    const startOfYear = new Date(today.getFullYear(), 0, 1)
                    setDate({
                      from: startOfYear,
                      to: today,
                    })
                    setIsOpen(false)
                  }}
                >
                  Year to date
                </Button>
              </div>
            </>
          )}
        </PopoverContent>
      </Popover>
    </div>
  )
}