import { Link } from "react-router-dom"

export const LinksList =  ({links}) => {
    if(links) {
        return (
            <p>Links not created yet</p>
        )
    }
    return (
   
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Open</th>
                </tr>
            </thead>

        <tbody>
         {
            links.map((link, index) => {
                return (
                    <tr key={link._id}>
                        <td>{index + 1}</td>
                        <td>{link.from}</td>
                        <td>{link.to}</td>
                        <td>{link.to}
                            <Link to={`/detail/${link._id}`}>Open</Link>
                        </td>
                    </tr>
                )
            })
         }
        </tbody>
      </table>
            
    )
}