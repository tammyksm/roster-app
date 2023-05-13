import moment from "moment";

export const WeekView = ({ data: employees }) => {
  const week = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  console.log(employees);
  return (
    <div>
      <table className=' border'>
        <tr className='mx-3'>
          <th className='mx-3 border '></th>
          {week.map((day) => (
            <th className='mx-3 border '>{day}</th>
          ))}
        </tr>
        {employees.map(
          (
            {
              first_name,
              last_name,
              dayOfShift,
              endOfShift,
              isOverlapping,
              shift,
              role,
            },
            i
          ) => (
            <tr>
              <td className='border'>
                <div
                  className='px-2 font-semibold'
                  style={{
                    color: role.text_colour,
                  }}
                >
                  <span>{first_name} {last_name}</span>
                </div>
                <span className="text-xs italic">{shift.break_duration / 3600}hr break</span>

              </td>
              {week.map((day, idx) => (
                <td className='border '>
                  {week.indexOf(dayOfShift) === idx && (
                    <div
                      className='p-3 text-sm rounded-lg'
                      style={{
                        background: role.background_colour,
                        color: role.text_colour,
                      }}
                    >
                      {moment(shift.start_time).format("LT")}-
                      {isOverlapping ? moment().startOf('day').format('hh:mm a') : moment(shift.end_time).format("LT")}
                      <div className='text-xs italic'>{role.name}</div>
                    </div>
                  )}
                  {week.indexOf(endOfShift) === idx && isOverlapping && (
                    <div
                      className='p-3 text-sm rounded-lg'
                      style={{
                        background: role.background_colour,
                        color: role.text_colour,
                      }}
                    >
                      {moment().startOf('day').format('hh:mm a')}-
                      {moment(shift.end_time).format("LT")}
                      <div className='text-xs italic'>{role.name}</div>
                    </div>
                  )}
                </td>
              ))}
            </tr>
          )
        )}
      </table>
    </div>
  );
};
