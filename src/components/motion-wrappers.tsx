import { motion } from "motion/react";
import { Card } from "./Card";

/**
 * Versões animadas dos componentes puros.
 *
 * A divisão existe pra `Card` continuar sem nenhuma dependência de motion:
 * quem quer animar importa daqui. É a mesma convenção do
 * `components/motion-wrappers.tsx` do typebot.
 */
export const MotionCard = motion.create(Card);
