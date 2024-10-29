import { useState } from "react";
import { Student } from "../types";

interface Props {
    email: Student["email"];
}

export default function Contact(props: Props) {
    const { email } = props;
    const [formData, setFormData] = useState({ name: "", message: "" });
    const [submittedData, setSubmittedData] = useState<string | null>(null);

    const showEmail = (): void => {
        window.alert(email);
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((data) => ({ ...data, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formData.name && formData.message) {
            setSubmittedData(JSON.stringify(formData, null, 2));
            setFormData(() => ({ name: "", message: "" }));
        } else {
            alert("Må fylle ut alle feltene");
        }
    };

    return (
        <section>
            <h2>Kontakt meg</h2>
            <button type="button" onClick={showEmail}>
                Se epost
            </button>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend>Send en melding</legend>
                    <label htmlFor="name">Navn</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <label htmlFor="message">Melding</label>
                    <textarea
                        name="message"
                        id="message"
                        value={formData.message}
                        onChange={handleChange}
                    ></textarea>
                    <button type="submit">Send inn</button>
                </fieldset>
            </form>
            {submittedData && <pre>{submittedData}</pre>}
        </section>
    );
}
