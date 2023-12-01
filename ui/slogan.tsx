'use client';
import { sloganContainer } from 'styles/formStyles';

export default function Slogan() {
  return (
    <div style={sloganContainer}>
      <div>
        <div className="text-left text-4xl font-bold text-white">
          Welcome, Rich Cuellar Lope
        </div>
        <div className="text-md text-left font-bold text-white">
          You are viewing the Pocket DAO dashbaord
        </div>
      </div>
    </div>
  );
}
