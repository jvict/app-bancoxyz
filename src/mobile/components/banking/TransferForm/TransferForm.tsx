import { TransferRequest } from "@/business/entities/Banking";
import { useState } from "react";
import { Alert, ScrollView } from "react-native";
import { Container, DateInput, DatePickerContainer, DatePickerLabel, Form, SectionTitle, Title } from "./TransferForm.styles";
import { Input } from "../../common/Input/Input";
import { Button } from "../../common/Button/Button";

export interface TransferFormProps {
    onSubmit : (TransferData: TransferRequest) => Promise<void>;
    loading?: boolean;
}

export const TransferForm: React.FC<TransferFormProps> = ({onSubmit, loading = false}) =>{
    const [formData, setFormData] = useState ({
        value: '',
        currency: 'BRL',
        payeerDocument: '',
        transferDate:''
    });

    const [errors, setErrors] = useState<{
        value?: string;
        payeerDocument?: string;
        transferDate?: string;
    }>({});

const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

    // Validar valor
    const value = parseFloat(formData.value);
    if (!formData.value || isNaN(value) || value <= 0) {
      newErrors.value = 'Valor deve ser maior que zero';
    }

    // Validar documento do destinatário
    if (!formData.payeerDocument.trim()) {
      newErrors.payeerDocument = 'Documento do destinatário é obrigatório';
    }

    // Validar data
    if (!formData.transferDate) {
      newErrors.transferDate = 'Data da transferência é obrigatória';
    } else {
      const transferDate = new Date(formData.transferDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (transferDate < today) {
        newErrors.transferDate = 'Data não pode ser no passado';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
        const transferData : TransferRequest = {
            value: parseFloat(formData.value),
            currency: formData.currency,
            payeerDocument: formData.payeerDocument.trim(),
            transferDate: formData.transferDate,
        }

        await onSubmit(transferData);

              // Limpar formulário após sucesso
      setFormData({
        value: '',
        currency: 'BRL',
        payeerDocument: '',
        transferDate: '',
      });
      
      Alert.alert('Sucesso', 'Transferência realizada com sucesso!');
    } catch (error) {
        Alert.alert(
        'Erro',
        error instanceof Error ? error.message : 'Erro ao realizar transferência'
      );
    }
  }

  const updateField = (field: keyof typeof formData) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Form>
          <Title>Nova Transferência</Title>
          
          <SectionTitle>Dados da Transferência</SectionTitle>
          
          <Input
            label="Valor (R$)"
            value={formData.value}
            onChangeText={updateField('value')}
            error={errors.value}
            keyboardType="numeric"
            placeholder="0,00"
          />

          <Input
            label="Documento do Destinatário"
            value={formData.payeerDocument}
            onChangeText={updateField('payeerDocument')}
            error={errors.payeerDocument}
            placeholder="CPF ou CNPJ do destinatário"
          />

          <DatePickerContainer>
            <DatePickerLabel>Data da Transferência</DatePickerLabel>
            <DateInput
              value={formData.transferDate}
              onChangeText={updateField('transferDate')}
              placeholder={getTodayDate()}
              hasError={!!errors.transferDate}
            />
            {errors.transferDate && (
              <Input error={errors.transferDate} />
            )}
          </DatePickerContainer>

          <Button
            title="Realizar Transferência"
            onPress={handleSubmit}
            loading={loading}
            fullWidth
          />
        </Form>
      </ScrollView>
    </Container>
  );
}