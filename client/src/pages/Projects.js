import { useSelector } from "react-redux"


export default function Projects (){
    const projects = useSelector((state) => state.auth.projects)

    return(
        <div className="logged">

            <p>{`${projects[0].id}`}</p>
            <p>{`${projects[0].notas}`}</p>
            <p>{`${projects[0].nombre_proy}`}</p>
        </div>
    )
}