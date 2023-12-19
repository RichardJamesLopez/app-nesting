'use client';
import { sloganContainer } from 'styles/formStyles';

export default function Slogan() {
  return (
    <div style={sloganContainer}>
      <div>
        <div className="text-left text-4xl font-bold text-white">Welcome!</div>
        <div className="text-left text-lg text-white">
          You are viewing the Pocket
          <span className="font-bold">DAO dashbaord</span>
        </div>
      </div>
    </div>
  );
}
