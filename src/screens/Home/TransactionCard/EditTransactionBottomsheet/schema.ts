import * as Yup from "yup";

export const transactionSchema = Yup.object().shape({
  description: Yup.string().required("Descrição é obrigatória"),
  value: Yup.number()
    .min(0.01, "Deve ser no minimo 1")
    .required("Valor é obrigatório"),
  categoryId: Yup.number()
    .min(1, "Categoria é obrigatória")
    .required("Categoria é obrigatória"),
  typeId: Yup.number()
    .min(1, "Seleciona um tipo de transação")
    .required("Tipo de transação é obrigatório"),
});
