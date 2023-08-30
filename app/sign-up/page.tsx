"use client";

import RegisterModal from "@/components/modals/RegisterModal";
import { useEffect } from "react";
import useRegisterModal from "../hooks/useRegisterModal";

const SignUpPage = () => {
	const registerModal = useRegisterModal();

	useEffect(() => {
		registerModal.onOpen();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <RegisterModal />;
};

export default SignUpPage;
