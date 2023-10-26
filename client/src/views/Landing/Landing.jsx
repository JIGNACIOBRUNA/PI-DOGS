import style from "./Landing.module.css"

const Landing = () =>{
    return(
        <div className={style.fondo}>
            <h1 className={style.titulo}>Dogs</h1>
            <h2 className={style.texto}>Ven a conocer las diferentes razas de perros en nuestra app!!</h2>
            <a href="/home" className={style.button}>Home</a>
        </div>
    )
}

export default Landing;