"use client";

import { useEffect } from "react";
import useLoginModal from "../hooks/useLoginModal";

const SignInPage = () => {
	const loginModal = useLoginModal();

	useEffect(() => {
		loginModal.onOpen();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <></>;
};

export default SignInPage;
