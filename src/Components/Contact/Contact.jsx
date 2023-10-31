import "./Contact.css";

export const Contact = () => {
  return (
    <div className="contact-block">
      <h3>Have any Questions? Want to Collaborate? Send Us a Message</h3>

      <p>Name</p>
      <input type="text" placeholder="Name" />
      <p>Email</p>
      <input type="text" placeholder="Email" />
      <p>Message</p>
      <textarea rows={10} />
      <button className="btn btn-primary">Send</button>
    </div>
  );
};
