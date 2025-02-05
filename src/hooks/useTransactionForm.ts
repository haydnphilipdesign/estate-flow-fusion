import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { validateStep } from "@/utils/validation";
import {
  PropertyData,
  Client,
  CommissionData,
  PropertyDetailsData,
  WarrantyData,
  TitleCompanyData,
  AdditionalInfoData,
  SignatureData
} from "@/types/transaction";

export const useTransactionForm = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  
  const [propertyData, setPropertyData] = useState<PropertyData>({
    mlsNumber: "",
    address: "",
    salePrice: "",
    status: "occupied",
    isWinterized: false,
    updateMls: false,
  });

  const [clients, setClients] = useState<Client[]>([
    {
      id: "1",
      name: "",
      email: "",
      phone: "",
      address: "",
      maritalStatus: "",
      type: "buyer",
    },
  ]);

  const [commissionData, setCommissionData] = useState<CommissionData>({
    totalCommission: "",
    brokerSplit: "",
    isReferral: false,
    referralFee: "",
  });

  const [propertyDetails, setPropertyDetails] = useState<PropertyDetailsData>({
    yearBuilt: "",
    squareFootage: "",
    propertyType: "single-family",
    description: "",
  });

  const [warrantyData, setWarrantyData] = useState<WarrantyData>({
    hasWarranty: false,
    provider: "",
    term: "",
    cost: "",
  });

  const [titleData, setTitleData] = useState<TitleCompanyData>({
    companyName: "",
    escrowOfficer: "",
    escrowNumber: "",
    phone: "",
    email: "",
  });

  const [additionalInfo, setAdditionalInfo] = useState<AdditionalInfoData>({
    specialConditions: "",
    notes: "",
    requiresFollowUp: false,
  });

  const [signatureData, setSignatureData] = useState<SignatureData>({
    termsAccepted: false,
    infoConfirmed: false,
    signature: "",
  });

  const handleStepClick = (step: number) => {
    const errors = validateStep(currentStep, {
      selectedRole,
      propertyData,
      clients,
      commissionData,
      propertyDetails,
      warrantyData,
      titleData,
      signatureData,
    });

    if (Object.keys(errors).length === 0 || step < currentStep) {
      setCurrentStep(step);
    } else {
      Object.values(errors).flat().forEach((error) => {
        toast({
          title: "Validation Error",
          description: error,
          variant: "destructive",
        });
      });
    }
  };

  const handleNext = () => {
    const errors = validateStep(currentStep, {
      selectedRole,
      propertyData,
      clients,
      commissionData,
      propertyDetails,
      warrantyData,
      titleData,
      signatureData,
    });

    if (Object.keys(errors).length === 0) {
      setCurrentStep((prev) => Math.min(prev + 1, 10));
    } else {
      Object.values(errors).flat().forEach((error) => {
        toast({
          title: "Validation Error",
          description: error,
          variant: "destructive",
        });
      });
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  return {
    currentStep,
    selectedRole,
    setSelectedRole,
    propertyData,
    setPropertyData,
    clients,
    setClients,
    commissionData,
    setCommissionData,
    propertyDetails,
    setPropertyDetails,
    warrantyData,
    setWarrantyData,
    titleData,
    setTitleData,
    additionalInfo,
    setAdditionalInfo,
    signatureData,
    setSignatureData,
    handleStepClick,
    handleNext,
    handlePrevious,
  };
};