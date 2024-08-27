import { Dispatch, SetStateAction, useCallback, useState, ChangeEvent } from 'react';

type returnTypes<T> = [T, (e: ChangeEvent<HTMLInputElement>) => void, Dispatch<SetStateAction<T>>];