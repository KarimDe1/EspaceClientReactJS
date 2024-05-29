import React, { useState, useEffect } from 'react';

import Error from '../Error';
import Loading from '../Loading';
import Success from '../Success';
import axios from "axios";

import { GovDeleg } from './GovDeleg';


export default function Profile() {
    const [Nom, setNom] = useState('');
    const [lastName, setLastName] = useState('');
    const [Tel, setTel] = useState('');
    const [Rue, setRue] = useState('');
    const [Gouvernorat, setGouvernorat] = useState('');
    const [Delegation, setDelegation] = useState('');
    const [Localite, setLocalite] = useState('');
    const [Ville, setVille] = useState('');
    const [Code_postal, setCode_postal] = useState('');
    const [GSM, setGSM] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [picture, setPicture] = useState('');
    const [Code_Client, setCode_Client] = useState('');
    const [Type_Client, setType_Client] = useState('');


    useEffect(() => {
        const clientString = localStorage.getItem('auth_client');
        const client = JSON.parse(clientString);

        if (client) {
            setNom(client.name);
            setLastName(client.last_name);
            setRue(client.rue);
            setGouvernorat(client.gouvernorat);
            setDelegation(client.delegation);
            setLocalite(client.localite);
            setVille(client.ville);
            setCode_postal(client.code_postal);
            setTel(client.tel);
            setGSM(client.gsm);
            setLogin(client.login);
            setPassword(client.password);
            setPicture(client.picture);
            setCode_Client(client.code_Client);
            setType_Client(client.type_Client);

        }
    }, []);

    function getCitiesByGovernorate(data) {
        const citiesByGovernorate = {};

        data.forEach(entry => {
            const { Gov, Deleg } = entry;

            if (!citiesByGovernorate[Gov]) {
                citiesByGovernorate[Gov] = [Deleg];
            } else {
                if (!citiesByGovernorate[Gov].includes(Deleg)) {
                    citiesByGovernorate[Gov].push(Deleg);
                }
            }
        });

        return citiesByGovernorate;
    }

    const citiesByGovernorate = getCitiesByGovernorate(GovDeleg);

    const handleGovChange = (event) => {
        setGouvernorat(event.target.value); // Update selected governorate
    };


    return (



        <div className="row justify-content-center">
            <div className="col-md-12">






                <div className="card">

                    <div className="card-header">
                        <h3>Informations du client</h3>
                    </div>
                    <div className="card-body">

                        <div className="row">
                            <div className="col-md-6">
                                Nom

                            </div>

                            <div className="col-md-6">
                                {Nom}

                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col-md-6">
                                prenom

                            </div>

                            <div className="col-md-6">
                                {lastName}
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col-md-6">
                                Code client

                            </div>

                            <div className="col-md-6">
                                {Code_Client}
                            </div>
                        </div>


                        <div className="row mt-3">
                            <div className="col-md-6">
                                Type du client

                            </div>

                            <div className="col-md-6">
                                {Type_Client}
                            </div>
                        </div>




                        <div className="row mt-2">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Image</label>
                                    <input type="file" className="form-control file-upload-info " placeholder="Télécharger une image" name="image" />
                                    <span className="input-group-append">

                                    </span>

                                </div>
                            </div>


                        </div>



                        <div class="ibox float-e-margins">
                            <div class="ibox-title">
                                <h5>Informations du compte</h5>
                            </div>
                            <div class="ibox-content no-padding">
                                <ul class="list-group">
                                    <li class="list-group-item lis">
                                        <div class="row">
                                            <div class="col-lg-3 col-md-3">Rue</div>
                                            <div class="col-lg-9 col-md-9">
                                                <div class="text-right">
                                                    <input type="text" class="form-control" name="rue" id="rue" value={Rue} required="" aria-required="true" onChange={(e) => setRue(e.target.value)} />
                                                </div>
                                            </div>
                                        </div>


                                    </li>

                                    <li class="list-group-item">
                                        <div class="row">
                                            <div class="col-lg-3 col-md-3">Gouvernorat</div>
                                            <div class="col-lg-9 col-md-9">
                                                <div class="text-right">
                                                    <select name="code_gouvernorat" className="form-control" required="" aria-required="true" value={Gouvernorat} onChange={(e) => setGouvernorat(e.target.value)}>
                                                        <option value="" disabled selected>Sélectionnez un gouvernorat</option> {/* Added 'selected' to make it default */}
                                                        {Object.keys(citiesByGovernorate).map((gov, index) => (
                                                            <option key={index} value={gov}>{gov}</option>
                                                        ))}
                                                    </select>

                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="list-group-item">
                                        <div class="row">
                                            <div class="col-lg-3 col-md-3">Délégation</div>
                                            <div class="col-lg-9 col-md-9">
                                                <div class="text-right">
                                                    <select name="delegation" className="form-control" required="" aria-required="true" value={Delegation} onChange={(e) => setDelegation(e.target.value)}>

                                                        <option value="" disabled>Sélectionnez une Délégation</option>
                                                        {Gouvernorat && citiesByGovernorate[Gouvernorat] && citiesByGovernorate[Gouvernorat].map((deleg, index) => (
                                                            <option key={index} value={deleg}>{deleg}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </li>

                                    <li class="list-group-item">
                                        <div class="row">
                                            <div class="col-lg-3 col-md-3">Localité</div>
                                            <div class="col-lg-9 col-md-9">
                                                <div class="text-right">
                                                    <select name="localite" class="form-control" id="localite" required="" aria-required="true">
                                                        <option value="">Localité</option>
                                                        <option value="682">Borj Cedria</option>
                                                        <option selected="" value="683">Hammam Chatt</option>
                                                        <option value="684">Bir El Bey</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="list-group-item">
                                        <div class="row">
                                            <div class="col-lg-3 col-md-3">Ville</div>
                                            <div class="col-lg-9 col-md-9">
                                                <div class="text-right">
                                                    <input name="ville" class="form-control" id="ville" value={Ville} onChange={(e) => setVille(e.target.value)} />
                                                </div>
                                            </div>
                                        </div>
                                    </li>

                                    <li class="list-group-item">
                                        <div class="row">
                                            <div class="col-lg-3 col-md-3">Code postal</div>
                                            <div class="col-lg-9 col-md-9">
                                                <div class="text-right">
                                                    <input type="text" class="form-control" name="code_postal" id="code_postal" value={Code_postal} required="" aria-required="true" onChange={(e) => setCode_postal(e.target.value)} />
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="list-group-item">
                                        <strong>NUMÉROS DE CONTACT</strong>
                                        <ul class="list-group">
                                            <li class="list-group-item">
                                                <div class="row">
                                                    <div class="col-lg-3 col-md-3">Tél</div>
                                                    <div class="col-lg-9 col-md-9">
                                                        <div class="text-right">
                                                            <input type="text" class="form-control" name="tel_fixe" id="tel_fixe" data-mask="99999999" value={Tel} required="" aria-required="true" onChange={(e) => setTel(e.target.value)} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li class="list-group-item">
                                                <div class="row">
                                                    <div class="col-lg-3 col-md-3">GSM</div>
                                                    <div class="col-lg-9 col-md-9">
                                                        <div class="text-right">
                                                            <input type="text" class="form-control" name="gsm" id="gsm" data-mask="99999999" value={GSM} required="" aria-required="true" onChange={(e) => setGSM(e.target.value)} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>



                        <div className="col-md-1">
                            <button type="submit" className="btn btn-primary mr-2">Modifier</button>
                        </div>



                    </div>
                </div>

                <div className="card">
                    <div className="card-header">
                        <h3>Informations du compte</h3>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-6">
                                Nom

                            </div>

                            <div className="col-md-6">
                                <input type="text" name="name" className="form-control" value={Nom} onChange={(e) => setNom(e.target.value)} />

                            </div>













                        </div>

                    </div>

                </div>



            </div>
        </div>

    );
}