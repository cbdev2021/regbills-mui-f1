import { FunctionComponent } from "react";
import styles from "./Home.module.css";
const Home: FunctionComponent = () => {
  return (
    <div className={styles.home}>
      <div className={styles.regbills}>RegBills</div>
      <div className={styles.homeChild} />
      <img className={styles.homeItem} alt="" src="/rectangle-31@2x.png" />
      <div className={styles.frame} />
      {/* <div className={styles.regbills1}>RegBills</div> */}
      <div className={styles.homeInner} />
      <b className={styles.bienvenidoARegbillsContainer}>
        <p className={styles.bienvenidoA}>Bienvenido a</p>
        <p className={styles.bienvenidoA}>RegBills!</p>
      </b>
      <div className={styles.rectangleDiv} />
      <div className={styles.regbills3}>RegBills</div>
      <div className={styles.preguntasFrecuentesParent}>
        <div className={styles.preguntasFrecuentes}>Preguntas frecuentes</div>
        <div className={styles.informacinCorporativa}>
          Información corporativa
        </div>
      </div>
      <div className={styles.centroDeAyudaParent}>
        <div className={styles.preguntasFrecuentes}>Centro de ayuda</div>
        <div className={styles.preguntasFrecuentes}>
          <p className={styles.bienvenidoA}>Privacidad</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
