import React from 'react';

export default function Congrats ({success}) {
  if (success) {
    return (
      <div data-testid="component-congrats" className="alert alert-success">
        <span data-test="congrats-message">
          Selamat! Kamu menebak katanya
        </span>
      </div>
    );
  } else {
    return (
      <div data-testid="component-congrats" />
    );
  }
}
