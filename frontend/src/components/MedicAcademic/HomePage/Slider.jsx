import React from 'react'

function Slider() {
    return (
        <div>
            <main>
                <section className="modal fade rounded-lg" tabIndex="-1" id="booking-modal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Modal title</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form action="#">
                                    <div className="row g-2">
                                        <div className="col-sm-6">
                                            Will be designed
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="hero-carousel" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#hero-carousel" data-bs-slide-to="0" className="active"
                            aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#hero-carousel" data-bs-slide-to="1"
                            aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#hero-carousel" data-bs-slide-to="2"
                            aria-label="Slide 3"></button>
                    </div>

                    <div className="carousel-inner">
                        <div className="carousel-item active c-item">
                            <img src="src/images/drops-6392473_1920.jpg" className="d-block w-100 c-img" alt="..." />
                            <div className="carousel-caption top-0 mt-5">
                                <h5>First slide label</h5>
                                <p>Some representative placeholder content for the first slide.</p>
                                <button className="btn btn-primary" data-bs-toggle="modal"
                                    data-bs-target="#booking-modal">Programlar</button>
                            </div>
                        </div>
                        <div className="carousel-item c-item">
                            <img src="src/images/christmas-background-1911637_1920.jpg" className="d-block w-100 c-img" alt="..." />
                            <div className="carousel-caption top-0 mt-5">
                                <h5>Second slide label</h5>
                                <p>Some representative placeholder content for the first slide.</p>
                                <button className="btn btn-primary" data-bs-toggle="modal"
                                    data-bs-target="#booking-modal">Yayınlar</button>
                            </div>
                        </div>
                        <div className="carousel-item c-item">
                            <img src="src/images/rowing-7453508_1920.jpg" className="d-block w-100 c-img" alt="..." />
                            <div className="carousel-caption top-0 mt-5">
                                <h5>Third slide label</h5>
                                <p>Some representative placeholder content for the first slide.</p>
                                <button className="btn btn-primary" data-bs-toggle="modal"
                                    data-bs-target="#booking-modal">Diğer belgeler</button>
                            </div>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#hero-carousel" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#hero-carousel" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </section>
            </main >
        </div >
    )
}

export default Slider