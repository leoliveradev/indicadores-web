export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div>
          <div className="footer-brand-logo">EN<span style={{ fontWeight: 300 }}>∧</span>COM</div>
          <div className="footer-brand-tagline">Ente Nacional de Comunicaciones</div>
          <div className="footer-address">
            Perú 103 (C1067AAC)<br />
            Teléfono: 0800 333 3344<br />
            Mesa de entradas: L/V 10-16 hs
          </div>
        </div>

        <div>
          <div className="footer-col-title">Indicadores</div>
          <div className="footer-address">
            Perú 103 (C1067AAC)<br />
            Teléfono: 4347 9538/39/40<br />
            Indicadores: L/V 8-18 hs<br />
            <a href="mailto:indicadores@enacom.gob.ar" className="footer-link" style={{ marginTop: 4 }}>
              indicadores@enacom.gob.ar
            </a>
          </div>
        </div>

        <div>
          <div className="footer-col-title">Acceso</div>
          <a href="https://www.enacom.gob.ar" target="_blank" rel="noreferrer" className="footer-link">
            Centros de atención al usuario
          </a>
          <a href="https://www.enacom.gob.ar" target="_blank" rel="noreferrer" className="footer-link">
            Biblioteca - CIT
          </a>
          <a href="https://www.enacom.gob.ar" target="_blank" rel="noreferrer" className="footer-link">
            Organismos vinculados
          </a>
          <a href="https://www.enacom.gob.ar" target="_blank" rel="noreferrer" className="footer-link">
            Boletín Oficial
          </a>
        </div>

        <div>
          <div className="footer-col-title">Información</div>
          <a href="https://www.enacom.gob.ar" target="_blank" rel="noreferrer" className="footer-link">
            Radioaficionados
          </a>
          <a href="https://www.enacom.gob.ar" target="_blank" rel="noreferrer" className="footer-link">
            Productoras
          </a>
          <a href="https://www.enacom.gob.ar" target="_blank" rel="noreferrer" className="footer-link">
            Publicidad
          </a>
          <a href="https://www.enacom.gob.ar" target="_blank" rel="noreferrer" className="footer-link">
            Reclamos
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        © Copyright {new Date().getFullYear()} ENACOM | Todos los Derechos reservados
      </div>
    </footer>
  );
}
