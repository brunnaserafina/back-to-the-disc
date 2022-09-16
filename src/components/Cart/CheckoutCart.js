import { useState, useContext } from "react";
import MessageContext from "../../contexts/MessageContext";
import { Button, BuyerData } from "./CartStyle";


export default function CheckoutCart() {
  const [render, setRender] = useState(false);
  const [rua, setRua] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const { setMessage } = useContext(MessageContext);

  const checkCep = (e) => {
    const cep = e.target.value.replace(".", "").replace("-", "");
    console.log(cep);
    fetch(`https://viacep.com.br/ws/${cep}/json`)
      .catch(() => setRender(false))
      .then((res) => res.json())
      .then((data) => {
        setRender(true);
        setRua(data.logradouro);
        setCity(data.localidade);
        setState(data.uf);
      });
  };

  function join(event) {
    event.preventDefault();

    setMessage({
      type: "confirm",
      message: {
        title: "Finalizar compra",
        text: "Você tem certeza que deseja finalizar sua compra e que seus dados estão corretos?",
        ifTrue: {
          function: addHistoric,
          params: "",
        },
      },
    });

    function addHistoric() {}

    //enviar para a rota histórico
  }

  return (
    <form onSubmit={join}>
      <BuyerData>
        <div>
          <h2>Digite seu CEP</h2>

          <input
            placeholder="777777-77"
            type="text"
            required
            onBlur={checkCep}
          />

          {render ? (
            <>
              <p>
                {rua}, {city} - {state}.
              </p>
              <h2>Digite seu número</h2>
              <input placeholder="nº" required />
            </>
          ) : (
            ""
          )}
        </div>

        <div>
          <h2>Escolha a forma de pagamento</h2>
          <select>
            <option value="credit">Cartão de crédito</option>
            <option value="debit">Cartão de débito</option>
            <option value="boleto">Boleto</option>
            <option value="pix">Pix</option>
          </select>
        </div>
      </BuyerData>

      <Button>Finalizar Compra</Button>
    </form>
  );
}
