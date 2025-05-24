import React, { useState, useEffect } from "react";
import "./Style.css";
interface NavigatorContacts extends Navigator {
  contacts?: {
    select: (
      properties: string[],
      options: { multiple: boolean }
    ) => Promise<any[]>;
  };
}

const App = () => {
  useEffect(() => {
    const button = document.querySelector("button") as HTMLButtonElement;
    const name = document.querySelector(".name") as HTMLInputElement;
    const address = document.querySelector(".address") as HTMLInputElement;
    const email = document.querySelector(".email") as HTMLInputElement;
    const tel = document.querySelector(".tel") as HTMLInputElement;
    const pre = document.querySelector("pre") as HTMLInputElement;
    const autofills = document.querySelectorAll(
      ".autofill"
    ) as NodeListOf<HTMLInputElement>;

    const navigatorWithContacts = navigator as NavigatorContacts;

    if (navigatorWithContacts.contacts) {
      for (const autofill of autofills) {
        (autofill.parentElement as HTMLInputElement).style.display = "none";
      }
      (address.parentElement as HTMLInputElement).style.display = "block";
      button.addEventListener("click", async () => {
        const props = ["name", "email", "tel", "address"];
        const opts = { multiple: false };
        try {
          if (navigatorWithContacts.contacts) {
            const [contact] = await navigatorWithContacts.contacts.select(
              props,
              opts
            );
            name.value = contact.name;
            address.value = contact.address;
            tel.value = contact.tel;
            email.value = contact.email;
          } else {
            pre.textContent = "Contacts API is not supported.";
          }
        } catch (err) {
          pre.textContent = `${err.name}: ${err.message}`;
        }
      });
    }
  }, []);

  return (
    <div className="container">
      <button hidden type="button">
        Open address book
      </button>
      <label>
        Name <input className="name" autoComplete="name" />
      </label>
      <label hidden>
        Address <input className="address" required />
      </label>
      <label>
        Street{" "}
        <input className="autofill" autoComplete="address-line1" required />
      </label>
      <label>
        City{" "}
        <input className="autofill" autoComplete="address-level2" required />
      </label>
      <label>
        State / Province / Region (optional){" "}
        <input className="autofill" autoComplete="address-level1" />
      </label>
      <label>
        ZIP / Postal code (optional){" "}
        <input className="autofill" autoComplete="postal-code" />
      </label>
      <label>
        Country <input className="autofill" autoComplete="country" />
      </label>
      <label>
        Email
        <input className="email" autoComplete="email" />
      </label>
      <label>
        Telephone
        <input className="tel" autoComplete="tel" />
      </label>
    </div>
  );
};
export default App;
