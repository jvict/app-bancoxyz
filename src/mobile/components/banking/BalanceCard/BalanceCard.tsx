import React from 'react';
import { Balance } from "@/business/entities/Banking";
import { BalanceAmount, BalanceContainer, Container, Currency, RefreshButton, RefreshText, Title } from "./BalanceCard.styles";

export interface BalanceCardProps {
    balance : Balance | null;
    loading?: boolean;
    onRefresh ?: () => void;
}

export const BalanceCard: React.FC<BalanceCardProps> = ({balance,loading = false, onRefresh}) => {
    const formatCurrency = (value : number, currency : string) =>{
        return new Intl.NumberFormat('pt-BR',{
            style: 'currency',
            currency: currency === 'BRL' ? 'BRL' : 'USD',
        }).format(value);
    };

    return(
        <Container>
            <Title>Saldo Atual</Title>

            <BalanceContainer>
                {loading ? (
                    <BalanceAmount>Carregando...</BalanceAmount>
                ): balance ? (
                    <>
                        <BalanceAmount>
                            {formatCurrency(balance.accountBalance,balance.currency)}
                        </BalanceAmount>
                        <Currency>{balance.currency}</Currency>
                    </>
                ):(
                    <BalanceAmount>Erro ao carregar saldo</BalanceAmount>
                )}
            </BalanceContainer>
            {onRefresh && (
                <RefreshButton onPress={onRefresh} disabled={loading}>
                    <RefreshText>Atualizar</RefreshText>
                </RefreshButton>
            )}
        </Container>
    )
}