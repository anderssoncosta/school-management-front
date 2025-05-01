import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export function useFormatDate() {
  function formatDate(dateString: string, dateFormat = "dd/MM/yyyy") {
    if (!dateString) return "";

    try {
      const date = new Date(dateString);
      return format(date, dateFormat, { locale: ptBR });
    } catch (error) {
      console.error("Erro ao formatar data:", error);
      return "";
    }
  }

  return { formatDate };
}
