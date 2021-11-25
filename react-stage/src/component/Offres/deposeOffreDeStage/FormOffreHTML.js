import React from 'react'
import useFormOffre from './useFormOffre'
import validateInfoOffre from './validateInfoOffre';
import './FormOffre';



const FormOffreHTML = ({ submitForm }) => {
    const { handleChange, values, handleSubmit, errors } = useFormOffre(submitForm, validateInfoOffre);

    return (
        <div className="form-content-right">
            <form className="form" onSubmit={handleSubmit}>
                <h1>Créez votre offre de stage dès maintenant!</h1>

                <div className="form-inputs">
                    <label htmlFor="titre"
                        className="form-label">
                        Titre
                    </label>
                    <input id="titre" type="text" name="titre" className="form-input" placeholder="Entrez le titre" value={values.titre} onChange={handleChange}></input>
                    {errors.titre && <p>{errors.titre}</p>}
                </div>

                <div className="form-inputs">
                    <label htmlFor="description"
                        className="form-label">
                        Description
                    </label>
                    <input id="description" type="text" name="description" className="form-input" placeholder="Entrez la description" value={values.description} onChange={handleChange}></input>
                    {errors.description && <p>{errors.description}</p>}
                </div>

                <div className="form-inputs">
                    <label htmlFor="entreprise"
                        className="form-label">
                        Entreprise
                    </label>
                    <input id="entreprise" type="text" name="entreprise" className="form-input" placeholder="Entrez votre entreprise" value={values.entreprise} onChange={handleChange}></input>
                    {errors.entreprise && <p>{errors.entreprise}</p>}
                </div>

                <div className="form-inputs">
                    <label htmlFor="adresse"
                        className="form-label">
                        Adresse
                    </label>
                    <input id="adresse" type="text" name="adresse" className="form-input" placeholder="Entrez l'adresse de votre entreprise" value={values.adresse} onChange={handleChange}></input>
                    {errors.adresse && <p>{errors.adresse}</p>}
                </div>

                <div className="form-inputs">
                    <label htmlFor="dateDebut"
                        className="form-label">
                        Date début
                    </label>
                    <input id="dateDebut" type="date" name="dateDebut" className="form-input" placeholder="Entrez la date de début" value={values.dateDebut} onChange={handleChange}></input>
                    {errors.dateDebut && <p>{errors.dateDebut}</p>}
                </div>

                <div className="form-inputs">
                    <label htmlFor="dateFin"
                        className="form-label">
                        Date fin
                    </label>
                    <input id="dateFin" type="date" name="dateFin" className="form-input" placeholder="Entrez la date de fin" value={values.dateFin} onChange={handleChange}></input>
                    {errors.dateFin && <p>{errors.dateFin}</p>}
                </div>

                <div className="form-inputs">
                    <label htmlFor="nbTotalSemaine"
                        className="form-label">
                        Nombre total de semaine
                    </label>
                    <input id="nbTotalSemaine" type="number" name="nbTotalSemaine" className="form-input" placeholder="Entrez le nombre total de semaine" value={values.nbTotalSemaine} onChange={handleChange}></input>
                    {errors.nbTotalSemaine && <p>{errors.nbTotalSemaine}</p>}
                </div>

                <div className="form-inputs">
                    <label htmlFor="horaireDebut"
                        className="form-label">
                        Horaire début
                    </label>
                    <input value={values.horaireDebut} onChange={handleChange} id="horaireDebut" className="form-field" type="time" name="horaireDebut" />
                    {errors.horaireDebut && <p>{errors.horaireDebut}</p>}
                </div>

                <div className="form-inputs">
                    <label htmlFor="horaireFin"
                        className="form-label">
                        Horaire fin
                    </label>
                    <input value={values.horaireFin} onChange={handleChange} id="horaireFin" className="form-field" type="time" name="horaireFin" />
                    {errors.horaireFin && <p>{errors.horaireFin}</p>}
                </div>

                <div className="form-inputs">
                    <label htmlFor="nbTotalHeuresParSemaine"
                        className="form-label">
                        Nombre total d'heure par semaine
                    </label>
                    <input id="nbTotalHeuresParSemaine" type="number" name="nbTotalHeuresParSemaine" className="form-input" placeholder="Entrez le nombre total d'heure par semaine" value={values.nbTotalHeuresParSemaine} onChange={handleChange}></input>
                    {errors.nbTotalHeuresParSemaine && <p>{errors.nbTotalHeuresParSemaine}</p>}
                </div>

                <div className="form-inputs">
                    <label htmlFor="tauxHoraire"
                        className="form-label">
                        Taux horaire
                    </label>
                    <input id="tauxHoraire" type="number" name="tauxHoraire" className="form-input" placeholder="Entrez le taux horaire" value={values.tauxHoraire} onChange={handleChange}></input>
                    {errors.tauxHoraire && <p>{errors.tauxHoraire}</p>}
                </div>

                <button className="form-input-btn" type="submit">Soumettre l'offre</button>
            </form>
        </div>
    )
}

export default FormOffreHTML

