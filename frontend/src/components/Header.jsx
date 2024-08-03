import '../styles/Header.css';

function Header() {
    return (
        <>
            <div className='container-fluid header-content'>
                <div className='row header-content'>
                    <div className='col header-content-items'>
                        <span className='header-content-items-title' id="header-franck">Franck</span>
                        <span className='header-content-items-title' id="header-flights">Flights</span>
                    </div>
                    <div className='col header-content-items'>
                        <h3 id="header-content-items-phrase">Book a flight now!</h3>
                    </div>
                    <div className='col header-content-items' id='header-content-items-currency'>
                        <img id="header-cad-flag" src='../public/canada_flag.png' />
                        <h4>$CAD</h4>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;