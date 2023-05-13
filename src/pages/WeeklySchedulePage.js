import moment from "moment";
import { WeekView } from "../components/WeekView"
import employees from "../files/employees.json";
import roles from "../files/roles.json";
import shifts from "../files/shifts.json";

export const WeeklySchedulePage = () => {

  const transformData = () => {
    const data = []
    for (const employee of employees) {
      const shift = shifts.find(shift => shift.employee_id === employee.id)
      const role = roles.find(role => role.id === shift.role_id)
      const dayOfShift = moment(shift.start_time).format('dddd')
      const endOfShift = moment(shift.end_time).format('dddd')
      
      const isOverlapping = dayOfShift !== endOfShift
      data.push({
        ...employee,
        shift,
        role,
        dayOfShift,
        endOfShift,
        isOverlapping,
      })
    }

    return data
  }

  return (
    <div>
      <div className="m-5 text-lg font-semibold">WeeklySchedulePage</div>
      <div className="flex justify-around">
      <WeekView data={transformData()}/>
      </div>
      
    </div>
  )
}
