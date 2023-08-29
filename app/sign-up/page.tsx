"use client";

import RegisterModal from "@/components/modals/RegisterModal";
import { useEffect } from "react";
import useRegisterModal from "../hooks/useRegisterModal";

const SignUpPage = () => {
	const registerModal = useRegisterModal();

	useEffect(() => {
		registerModal.onOpen();
	}, []);

	return <RegisterModal />;
};

export default SignUpPage;
