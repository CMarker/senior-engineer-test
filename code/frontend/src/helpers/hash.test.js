import hashPassword from './hash';

test('hash matches', () => {
    expect(hashPassword("123456")).resolves.toBe("PnFfQnFXeID1BlaxenfPiT6eAGViAyPZ1jSKSvkSWrKfsAauru6EFCuHPUJZyPMo69oSc4hSyN9/GAw1r6EOzw==");
});
