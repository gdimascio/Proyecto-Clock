import { useSelector } from "react-redux"


export default function Projects (){
    const projects = useSelector((state) => state.auth.projects)

    const projDisp = projects.map(function(proj) {
        return <p>{proj.nombre_proy}</p>
    })

    return(
        <div className="logged">
            {projDisp}
        </div>
    )
}