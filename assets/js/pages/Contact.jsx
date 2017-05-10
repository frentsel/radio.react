import React from 'react';

export default () => {

    return (
        <div className="page-container">
            <h1>Contact page</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur at beatae, cupiditate ipsum iure
                labore nulla officiis praesentium quibusdam voluptates. Accusantium architecto et fugiat iste
                laboriosam?</p>
            <p>Blanditiis corporis cupiditate dolor eligendi enim, ex excepturi exercitationem fugit non omnis porro
                possimus praesentium quia quisquam reprehenderit saepe similique temporibus ut velit voluptas.
                Quaerat!</p>
            <form action="" className="contact-form">
                <fieldset>
                    <legend>Contact form</legend>
                    <input className="default-style" type="text" name="name" placeholder="Name" required/>
                    <input className="default-style" type="email" name="email" placeholder="E-Mail" required/>
                    <textarea className="default-style" name="text" cols="30" rows="10" placeholder="Message..."/>
                    <button className="default-style" type="submit">Send</button>
                </fieldset>
            </form>
        </div>
    );
};