function MembersTable({ members, showActions, onDelete }) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <table className="w-full">
        <thead className="bg-slate-100">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">
              Name
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">
              Last Name
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">
              Position
            </th>
            {showActions && (
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">
                Action
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {members.map((member, index) => (
            <tr
              key={member.id}
              className={`${
                index % 2 === 0 ? "bg-white" : "bg-slate-50"
              } hover:bg-indigo-50 transition-colors`}
            >
              <td className="px-6 py-4 text-slate-700">{member.name}</td>
              <td className="px-6 py-4 text-slate-700">{member.lastName}</td>
              <td className="px-6 py-4 text-slate-700">{member.position}</td>
              {showActions && (
                <td className="px-6 py-4">
                  <button
                    onClick={() => onDelete(member.id)}
                    className="text-red-500 hover:text-red-700 font-medium transition-colors"
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MembersTable;
