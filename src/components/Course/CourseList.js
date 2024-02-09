import Course from "./Course";

export default function CourseList({courses}){
    return (
        <div className="grid grid-cols-3">
            {courses.map((e,i) => {
                return <Course key={i} src={e.image} title={e.title} description={e.description} />
            })}
        </div>
    )
}